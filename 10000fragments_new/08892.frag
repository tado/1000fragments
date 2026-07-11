uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.03);
    float gsh = hash21(vec2(grow, floor(t * 3.62))) - 0.5;
    float gx = p.x + gsh * 0.96;
    v = sin(gx * 16.59 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.56));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.45; p = rot2(2.22) * p; }
	p = rot2(time * -0.80) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.66));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
