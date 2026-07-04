uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.83 + jf * 4.0), cos(t * 0.42 * jf)) * 0.92;
        xs += sin(length(p - im) * 91.79 - t * 4.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.23) * p * 15.27;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = mix(vec3(0.78, 0.80, 0.97), vec3(0.05, 0.06, 0.17), v);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 1.90 + time * 7.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
