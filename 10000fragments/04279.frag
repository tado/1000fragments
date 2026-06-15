uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.88 + sr * 5.40 - t * 1.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.19, vec3(0.44, 0.57, 0.50), vec3(0.46, 0.39, 0.36), vec3(0.80, 0.84, 0.93), vec3(0.33, 0.64, 0.93));
	col = fract(col * 1.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
