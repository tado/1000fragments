uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.51 + sin(p.y * 1.52 + t * 0.96) * 2.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.42) * p * 15.35;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.10, 0.13, 0.05), vec3(0.81, 0.90, 0.69), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
