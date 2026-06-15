uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.12 + sin(p.y * 5.65 + t * 3.39) * 4.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.90, 0.90) * sin(length(p) * 5.25 - time * 0.71) * 0.28;
	p = rot2(length(p) * -3.07 + time * 0.57) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(2.49) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.19, 0.19), vec3(0.84, 0.81, 0.70), d);
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
