uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.41 + t * 3.47 + ph) + sin(p.y * 12.28 - t * 3.47 + ph)
        + sin((p.x + p.y) * 8.58 + t * 3.47 + ph) + sin(length(p) * 16.07 - t * 3.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.20, vec3(0.45, 0.54, 0.58), vec3(0.46, 0.43, 0.47), vec3(0.73, 0.85, 1.29), vec3(0.16, 0.75, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
