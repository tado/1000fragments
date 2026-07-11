uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.95 + t * 5.05 + ph) + sin(p.y * 9.24 - t * 5.42 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.24, vec3(0.45, 0.49, 0.44), vec3(0.31, 0.35, 0.37), vec3(1.11, 0.93, 1.25), vec3(0.03, 0.51, 0.88));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
