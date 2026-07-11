uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.55 - t * 8.92 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.86 + t * 4.51 + ph) + sin(p.y * 14.83 - t * 3.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.83;
	p += vec2(-0.66, -0.66) * sin(length(p) * 3.27 - time * 1.73) * 0.24;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.24, vec3(0.50, 0.59, 0.46), vec3(0.33, 0.36, 0.32), vec3(0.80, 0.73, 1.27), vec3(0.42, 0.25, 0.33));
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
