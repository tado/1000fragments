uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.04 - t * 1.87;
    v = sin(floor(lv * 5.5) / 5.5 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.21) * p * 16.00;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = mix(vec3(0.89, 0.76, 0.65), vec3(0.07, 0.07, 0.14), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
