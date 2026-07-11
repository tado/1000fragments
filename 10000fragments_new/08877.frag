uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.15 * cos(sa * 3.0 + t * 1.19 + ph);
    v = sin((sr - petal) * 16.92);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(0.47) * p; }
	p += vec2(-0.98, -0.83) * sin(length(p) * 2.71 - time * 1.69) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.44, 0.79) * (0.15 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
