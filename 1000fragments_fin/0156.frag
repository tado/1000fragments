uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(-0.62 + 0.3 * sin(t * 1.09 + ph), 0.61 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.76; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.16 - t * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	float d1 = field(p, (time * 0.60), 0.0);
	float d2 = field2(p, (time * 0.60), 0.88);
	float d = d1 + d2;
	vec3 col = palette(d * 1.36 + (time * 0.60) * 0.08, vec3(0.60, 0.68, 0.77), vec3(0.23, 0.17, 0.17), vec3(0.97, 1.04, 0.98), vec3(0.53, 0.58, 0.65));
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.968, 1.017, 0.955);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
