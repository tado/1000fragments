uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.13, t * 1.65 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -1.25 + time * 0.71) * p;
	p += vec2(0.48, 0.43) * sin(length(p) * 4.23 - time * 1.51) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.95 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
