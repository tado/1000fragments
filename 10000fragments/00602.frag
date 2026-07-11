uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.99 + sin(p.y * 2.46 + t * 4.94) * 4.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.38) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.18, vec3(0.55, 0.53, 0.60), vec3(0.37, 0.49, 0.41), vec3(1.10, 0.87, 1.17), vec3(0.94, 0.48, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
