uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.99 + t * 5.35 + ph) + sin(p.y * 13.78 - t * 4.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.16) * p * 10.97;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.04, 0.13, 0.20), vec3(0.82, 0.92, 0.84), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
