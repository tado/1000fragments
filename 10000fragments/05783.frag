uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.67 + t * 1.86 + ph) + sin(p.y * 9.83 - t * 1.86 + ph)
        + sin((p.x + p.y) * 8.47 + t * 1.86 + ph) + sin(length(p) * 5.20 - t * 1.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.05, vec3(0.53, 0.40, 0.56), vec3(0.42, 0.33, 0.41), vec3(0.71, 0.70, 1.18), vec3(0.56, 0.85, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
