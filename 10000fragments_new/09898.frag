uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.61);
    float gsh = hash21(vec2(grow, floor(t * 4.46))) - 0.5;
    float gx = p.x + gsh * 1.14;
    v = sin(gx * 14.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.75));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p.y += sin(p.x * 7.87 + time * 2.27) * 0.40;
	p = rot2(length(p) * -1.08 + time * 1.30) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(1.64) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.60, 0.17, 0.96) * (0.15 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
