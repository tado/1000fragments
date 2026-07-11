uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.83) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.83 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.89 + t * 2.75 + ph) + sin(p.y * 6.64 - t * 1.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = d1 * d2;
	vec3 col = palette(d * 0.74 + time * 0.23, vec3(0.50, 0.42, 0.41), vec3(0.37, 0.41, 0.33), vec3(0.95, 0.88, 1.22), vec3(0.16, 0.50, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
