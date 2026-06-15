uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 23.29 - t * 6.67 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 31.85 - t * 6.67 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.18, vec3(0.42, 0.44, 0.57), vec3(0.47, 0.38, 0.46), vec3(1.32, 1.09, 0.82), vec3(0.11, 0.02, 0.72));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
