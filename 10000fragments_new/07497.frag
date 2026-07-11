uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.14);
    float gsh = hash21(vec2(grow, floor(t * 5.36))) - 0.5;
    float gx = p.x + gsh * 0.40;
    v = sin(gx * 7.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.19));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.76;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.58; p = rot2(1.13) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.16, 0.85, 0.51) + vec3(0.02, 0.21, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
