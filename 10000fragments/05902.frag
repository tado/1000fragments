uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.95 + t * 3.70 + ph) + sin(p.y * 10.25 - t * 3.70 + ph)
        + sin((p.x + p.y) * 7.52 + t * 3.70 + ph) + sin(length(p) * 13.38 - t * 3.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	p = rot2(length(p) * -1.42 + time * 0.77) * p;
	p = rot2(0.62) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(0.30) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.39, 0.37, 0.41), vec3(0.66, 0.62, 0.92), d);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
