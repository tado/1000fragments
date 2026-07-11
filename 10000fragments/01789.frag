uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.15 - t * 6.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.17, vec3(0.59, 0.50, 0.53), vec3(0.46, 0.37, 0.30), vec3(1.33, 1.25, 1.25), vec3(0.22, 0.44, 0.74));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
