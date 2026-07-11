uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.12 * cos(sa * 5 + t * 0.68 + ph);
    v = sin((sr - petal) * 9.46);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.44; p = rot2(1.03) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.76));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
