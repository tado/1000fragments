uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.17);
    float gsh = hash21(vec2(grow, floor(t * 5.23))) - 0.5;
    float gx = p.x + gsh * 0.44;
    v = sin(gx * 18.26 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.35));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	p = fract(p * 1.16) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(1.75) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.81, 0.18) * (0.19 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
