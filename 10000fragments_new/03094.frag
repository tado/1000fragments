uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.90);
    float gsh = hash21(vec2(grow, floor(t * 3.17))) - 0.5;
    float gx = p.x + gsh * 0.96;
    v = sin(gx * 7.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.56));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.76) * p;
	p = (floor(p * 6.5) + 0.5) / 6.5;
	p.y += sin(p.x * 5.13 + time * 1.34) * 0.35;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.19, 0.53, 0.93) * (0.21 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
