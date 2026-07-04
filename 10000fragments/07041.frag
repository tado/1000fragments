uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.64;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.84) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.28) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.90) * p * 16.78;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.05, 0.14, 0.06), vec3(0.79, 0.93, 0.94), v);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
