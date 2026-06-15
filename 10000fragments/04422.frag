uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.78) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.91 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.03 + t * 3.54 + ph) + sin(p.y * 8.24 - t * 4.87 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.23, vec3(0.57, 0.55, 0.49), vec3(0.42, 0.45, 0.44), vec3(1.02, 0.87, 0.78), vec3(0.17, 0.19, 0.32));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
