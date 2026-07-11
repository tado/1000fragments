uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.07) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	p = rot2(length(p) * 1.14 + time * 0.86) * p;
	p = rot2(p.y * 2.76 + time * 0.97) * p;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.28, 0.03), vec3(0.55, 0.76, 0.66), d);
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
