uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.98 + t * 0.73 + ph) + sin(p.y * 10.87 - t * 2.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.27, vec3(0.44, 0.42, 0.58), vec3(0.34, 0.46, 0.34), vec3(1.00, 0.86, 0.91), vec3(0.48, 0.63, 0.22));
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
