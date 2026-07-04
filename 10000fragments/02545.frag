uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.66);
    float gsh = hash21(vec2(grow, floor(t * 5.32))) - 0.5;
    float gx = p.x + gsh * 0.58;
    v = sin(gx * 12.93 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.12));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.37; p = rot2(1.67) * p; }
	p = rot2(length(p) * -3.59 + time * 1.46) * p;
	p = sin(p * 2.09 + time * 0.55) * 0.97;
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 4.37 - time * 0.86); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.01, 0.22, 0.25), vec3(0.60, 0.87, 0.65), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
