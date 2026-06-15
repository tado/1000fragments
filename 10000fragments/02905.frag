uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 12.58 - t * 2.46 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 32.15 - t * 2.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.09, vec3(0.49, 0.53, 0.50), vec3(0.31, 0.38, 0.49), vec3(1.21, 1.15, 1.14), vec3(0.54, 0.74, 0.80));
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
