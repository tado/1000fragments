uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.98) - 0.5;
    float rad = 0.20 + 0.12 * sin(t * 1.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.50 + sr * 14.68 - t * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.27);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.54 + time * 0.08, vec3(0.47, 0.53, 0.53), vec3(0.50, 0.46, 0.42), vec3(1.09, 0.90, 0.77), vec3(0.02, 0.21, 0.36));
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
