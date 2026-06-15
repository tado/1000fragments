uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.88 + sin(p.y * 1.28 + t * 2.56) * 4.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p *= 1.51;
	p += vec2(-0.53, -0.65) * sin(length(p) * 3.17 - time * 0.82) * 0.28;
	p = abs(p) - 0.73;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.07, vec3(0.55, 0.57, 0.41), vec3(0.38, 0.35, 0.37), vec3(1.31, 1.27, 0.75), vec3(0.21, 0.43, 0.72));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
