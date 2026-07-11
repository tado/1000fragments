uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.98 + t * 4.71 + ph) + sin(p.y * 13.09 - t * 4.71 + ph)
        + sin((p.x + p.y) * 2.32 + t * 4.71 + ph) + sin(length(p) * 15.85 - t * 4.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	p = rot2(length(p) * 3.01 + time * 0.69) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.45, 0.00), vec3(0.68, 0.79, 0.60), d);
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
