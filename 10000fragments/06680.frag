uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.71 + t * 2.23 + ph) + sin(p.y * 5.19 - t * 3.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.22, vec3(0.57, 0.45, 0.54), vec3(0.31, 0.37, 0.44), vec3(1.22, 1.06, 0.82), vec3(0.36, 0.52, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
