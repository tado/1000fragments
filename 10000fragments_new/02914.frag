uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(0.07 + 0.3 * sin(t * 0.99 + ph), 0.31 + 0.3 * cos(t * 0.81 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 23.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.46; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.51 - t * 1.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p.y += sin(p.x * 7.97 + time * 2.73) * 0.21;
	{ p = vec2(atan(p.y, p.x) * 1.47, length(p) * 2.29 - time * 0.82); }
	p = rot2(2.67) * p;
	p *= 1.89;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.47);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.17, vec3(0.40, 0.55, 0.43), vec3(0.32, 0.45, 0.43), vec3(1.01, 0.95, 1.16), vec3(0.47, 0.69, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
