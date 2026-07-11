uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.07 + t * 0.76 + ph) + sin(p.y * 5.45 - t * 3.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.47 + time * 0.93) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.26, vec3(0.48, 0.41, 0.60), vec3(0.31, 0.35, 0.42), vec3(0.77, 0.78, 1.36), vec3(0.91, 0.19, 0.53));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
