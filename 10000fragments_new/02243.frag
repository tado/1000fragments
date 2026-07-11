uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.32);
    float gsh = hash21(vec2(grow, floor(t * 8.04))) - 0.5;
    float gx = p.x + gsh * 1.05;
    v = sin(gx * 14.04 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.37));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(0.61) * p;
	p = (floor(p * 29.5) + 0.5) / 29.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.32, lr * 1.56 + time * -0.83); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.50, 0.57), vec3(0.98, 0.62, 0.79), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
