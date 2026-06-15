uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.90 + sr * 13.28 - t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(0.38) * p; }
	p += vec2(-0.49, 0.58) * sin(length(p) * 3.79 - time * 0.50) * 0.37;
	p *= 3.22;
	p = rot2(time * 0.69) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.06, vec3(0.57, 0.53, 0.52), vec3(0.37, 0.41, 0.36), vec3(0.81, 1.33, 0.98), vec3(0.94, 0.60, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
