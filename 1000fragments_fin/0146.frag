uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.68 * sin(mf + 3.0) + ph), cos(t * 0.65 * cos(mf + 3.0) + ph));
        ms += 0.050 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	float d = field(p, (time * 0.64), 0.0);
	vec3 col = palette(d * 0.61 + (time * 0.64) * 0.24, vec3(0.45, 0.41, 0.47), vec3(0.36, 0.30, 0.35), vec3(0.95, 0.99, 0.99), vec3(0.83, 0.95, 0.18));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.988, 1.002, 0.997);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
