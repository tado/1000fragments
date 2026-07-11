uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.10, t * 1.82 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.03, vec3(0.50, 0.49, 0.55), vec3(0.34, 0.32, 0.37), vec3(1.11, 0.96, 0.94), vec3(0.46, 0.76, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
