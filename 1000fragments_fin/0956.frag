uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.07; vec2 jc = vec2(-0.74 + 0.3 * sin(t * 1.52 + ph), -0.51 + 0.3 * cos(t * 0.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.74) * 0.90), cos((time * 0.74) * 0.84)) * 0.10;
	float an = atan(p.y, p.x) + (time * 0.74) * -0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.02 / 3.1415927, 1.43 / r + (time * 0.74) * 1.93);
	tv.x += tv.y * 0.26;
	float d = field(tv, (time * 0.74), 0.0);
	vec3 col = palette((d) * 0.87 + (time * 0.74) * 0.22, vec3(0.47, 0.40, 0.33), vec3(0.39, 0.33, 0.35), vec3(0.99, 1.05, 1.03), vec3(0.07, 0.34, 0.57));
	col *= clamp(r * 1.52, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.968, 0.995, 0.956);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
