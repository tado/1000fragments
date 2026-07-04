uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.83 + ga * 2.0 - t * 1.84 + ph);
    v = arm * exp(-gr * 0.61);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.52;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.33) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 0.71) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.52));
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.80 + time * 0.16, vec3(0.55, 0.48, 0.42), vec3(0.35, 0.34, 0.48), vec3(0.77, 0.95, 1.18), vec3(0.73, 0.92, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
