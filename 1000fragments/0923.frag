uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.91;
    v = 0.5 * (sin(5.0 * cp.x + t * 1.31) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 0.65) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.98) * p * 8.30;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.06, 0.09, 0.10), vec3(0.95, 0.79, 0.74), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
