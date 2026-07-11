uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.65);
    float gsh = hash21(vec2(grow, floor(t * 3.81))) - 0.5;
    float gx = p.x + gsh * 1.06;
    v = sin(gx * 14.66 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.66));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = rot2(length(p) * 2.20 + time * 1.24) * p;
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	p = (floor(p * 28.4) + 0.5) / 28.4;
	p += vec2(0.43, -0.43) * sin(length(p) * 4.44 - time * 1.18) * 0.26;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.29, 0.48), vec3(0.77, 0.96, 0.71), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
