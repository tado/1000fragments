uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.79) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 1.97 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.25 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.09, vec3(0.59, 0.59, 0.57), vec3(0.35, 0.49, 0.49), vec3(1.14, 0.90, 1.25), vec3(0.08, 0.95, 0.08));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
