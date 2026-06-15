uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.78 + t * 2.78 + ph) + sin(p.y * 13.41 - t * 5.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.28, vec3(0.50, 0.42, 0.53), vec3(0.38, 0.34, 0.41), vec3(1.00, 0.71, 0.90), vec3(0.86, 0.91, 0.59));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
