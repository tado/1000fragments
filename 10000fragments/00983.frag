uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.54 + t * 3.82 + ph) + sin(p.y * 5.16 - t * 3.82 + ph)
        + sin((p.x + p.y) * 9.10 + t * 3.82 + ph) + sin(length(p) * 16.29 - t * 3.82 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.80) - 0.5;
	p = rot2(length(p) * 1.39 + time * 0.77) * p;
	p = rot2(time * -0.36) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.07, 0.25), vec3(0.52, 0.91, 0.87), d);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
