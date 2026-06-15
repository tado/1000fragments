uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 16.43 - t * 5.98 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 17.76 - t * 5.98 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.90 + t * 3.48 + ph) + sin(p.y * 17.78 - t * 2.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.52 + time * 0.25, vec3(0.51, 0.54, 0.57), vec3(0.30, 0.48, 0.38), vec3(0.75, 0.94, 1.09), vec3(0.49, 0.64, 0.74));
	col = mod(col * 1.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
