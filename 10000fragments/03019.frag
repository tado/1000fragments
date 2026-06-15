uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.77 + t * 1.29 + ph) + sin(p.y * 2.17 - t * 1.29 + ph)
        + sin((p.x + p.y) * 4.87 + t * 1.29 + ph) + sin(length(p) * 13.25 - t * 1.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.09, vec3(0.54, 0.50, 0.55), vec3(0.41, 0.44, 0.50), vec3(0.90, 1.15, 1.13), vec3(0.35, 0.12, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
