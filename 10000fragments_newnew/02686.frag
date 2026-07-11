uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.56 * jf)) * 0.69;
        xs += sin(length(p - im) * 131.42 - t * 10.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.23) * p * 8.13;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.03, 0.07, 0.13), vec3(0.94, 0.98, 0.76), v);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 1.41 + time * 13.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
