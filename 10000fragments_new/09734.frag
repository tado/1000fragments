uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.97) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 0.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 12.3) + 0.5) / 12.3;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	p = rot2(p.y * -3.39 + time * 0.55) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.63 + time * 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
