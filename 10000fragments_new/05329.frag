uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.65 + t * 3.94 + ph) + sin(p.y * 4.29 - t * 3.94 + ph)
        + sin((p.x + p.y) * 2.52 + t * 3.94 + ph) + sin(length(p) * 14.03 - t * 3.94 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.06, vec3(0.49, 0.59, 0.49), vec3(0.37, 0.38, 0.40), vec3(1.38, 1.27, 1.26), vec3(0.40, 0.29, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
