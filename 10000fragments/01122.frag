uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 36.56 - t * 2.02 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 36.20 - t * 2.02 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.19, vec3(0.56, 0.45, 0.52), vec3(0.38, 0.47, 0.45), vec3(1.34, 1.15, 1.33), vec3(0.06, 0.86, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
