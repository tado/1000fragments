uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 12.73 - t * 7.35 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 32.25 - t * 3.81 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	p = (floor(p * 23.4) + 0.5) / 23.4;
	p += vec2(-0.74, -0.25) * sin(length(p) * 4.91 - time * 2.23) * 0.17;
	p.y += sin(p.x * 7.82 + time * 2.74) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.21, vec3(0.55, 0.58, 0.51), vec3(0.50, 0.32, 0.37), vec3(0.88, 1.26, 0.86), vec3(0.02, 0.37, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
